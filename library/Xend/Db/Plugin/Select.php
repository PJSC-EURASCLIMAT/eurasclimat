<?php

/**
 * The plugin help to fill params as
 * "limit", "order", "sort", "filters"
 * into SQL query
 *
 * @category    Xend
 * @package     Xend_Db_Plugin
 */
class Xend_Db_Plugin_Select
{
	const STRATEGY_GRID        = 'grid';

	const STRATEGY_COMBO       = 'combo';

	const LIMIT                = 'limit';
	const START                = 'start';
	const SORT                 = 'sort';
	const MSORT                = 'property';
	const DIR                  = 'dir';
	const MDIR                 = 'direction';
	const FILTER               = 'filter';

    /**
     * Predefined table
     *
     * @var Zend_Db_Table_Abstract
     */
    protected $_table;

    /**
     * Detault adapter
     *
     * @var Zend_Db_Adapter_Abstract
     */
    protected $_adapter;

    /**
     * The tables cols
     *
     * @var array
     */
    protected $_fields = array();

    /**
     * Predefined select statement
     *
     * @var Xend_Db_Select
     */
    protected $_selectStatement;

    protected $_sqlCalcFoundRows = false;

    /**
     * array of param names
     *
     * @var array
     */
    protected $_paramNames = array(
        self::LIMIT                 => self::LIMIT,
        self::START                 => self::START,
        self::SORT                  => self::SORT,
        self::MSORT                 => self::MSORT,
        self::DIR                   => self::DIR,
        self::MDIR                  => self::MDIR,
        self::FILTER                => self::FILTER
    );

    /**
     * The input params
     * @var array
     */
    protected $_params;

    /**
     * Define allowed limit
     *
     * @var boolean
     */
    protected $_allowLimit = true;

    protected $_strategy = self::STRATEGY_GRID;

    /**
     * Constructor
     *
     * @param Zend_Db_Table_Abstract $table  the working table
     * @param Zend_Db_Select $statement      the working statement
     * @param array $fields                  available fields
     */
    public function __construct(
        Zend_Db_Table_Abstract $table = null,
        Zend_Db_Select & $statement,
        array $fields = array()
    ) {
        $this->_table = $table;
        $this->_adapter = $statement->getAdapter();
        $this->_selectStatement = $statement;

        if (empty($fields) && !is_null($table)) {
            $fields = $table->info(Xend_Db_Table_Abstract::COLS);
        }

        $this->_fields = $fields;
    }

    /**
     * Set param names
     *
     * @param array $data            param names
     * @return void
     */
    public function setParamNames($data)
    {
        foreach ($data as $k => $v) {
            if (array_key_exists($k, $this->_paramNames)) {
                $this->_paramNames[$k] = $v;
            }
        }
    }

    /**
     * Get param names
     *
     * @param array $name name of parameter
     * @return mixed
     */
    public function getParamNames($name = null)
    {
        if (array_key_exists($name, $this->_paramNames)) {
            return $this->_paramNames[$name];
        }

        return $this->_paramNames;
    }

    /**
     * Parse order, limit and filter params and add this to statement
     *
     * @param array $params            params
     * @return Zend_Db_Select          the modified statement
     */
    public function parse(array $params)
    {
        $this->_params = $params;
        $this->parseFilters();
        $this->parseOrders();
        $this->parseLimits();

        if (true === $this->_sqlCalcFoundRows) {
	        if (method_exists($this->_selectStatement, 'setSqlCalcFoundRows')) {
	        	$this->_selectStatement->setSqlCalcFoundRows($this->_sqlCalcFoundRows);
	        } else {
	        	$this->_sqlCalcFoundRows = false;
	        }
        }

		if ($this->_strategy == self::STRATEGY_COMBO && !empty($params['value'])) {
            $this->parseComboBoxValue();
		}

        return $this->_selectStatement;
    }

    /**
     * Parse order params and add this to statement
     *
     * @param array $params            params
     * @return Zend_Db_Select          the modified statement
     */
    public function parseComboBoxValue($params = null)
    {
        if (!isset($params)) {
            $params = $this->_params;
        }

        $field = $this->getAlias('value');
		$value = $params['value'];

		$comboStatement = clone $this->_selectStatement;

		$comboStatement->reset(Xend_Db_Select::ORDER);
		$comboStatement->reset(Xend_Db_Select::LIMIT_OFFSET);
		$comboStatement->reset(Xend_Db_Select::LIMIT_COUNT);
		$comboStatement->reset(Xend_Db_Select::SQL_CALC_FOUND_ROWS);
		$comboStatement->where($field . ' = ?', $value);

		$count = $this->_selectStatement->getPart(Xend_Db_Select::LIMIT_COUNT);
		$offset = $this->_selectStatement->getPart(Xend_Db_Select::LIMIT_OFFSET);
		$this->_selectStatement->limit($count - 1, $offset);
        $this->_selectStatement->where($field . ' != ?', $value);

		$this->_selectStatement = $this->_adapter->select()->union(array($this->_selectStatement, $comboStatement));

        return $this->_selectStatement;
    }

    /**
     * Parse order params and add this to statement
     *
     * @param array $params            params
     * @return Zend_Db_Select          the modified statement
     */
    public function parseOrders($params = null)
    {
        if (!isset($params)) {
            $params = $this->_params;
        }

        if (!isset($params[self::SORT])) {
            return $this->_selectStatement;
        }

        // Check for multiple sorting (JSON array expected)
        $sorters = Zend_Json::decode($params[self::SORT]);

        // Common sorting
        if (is_string($sorters)) {

            if (!in_array($params[self::SORT], $this->_fields)) {
                return $this->_selectStatement;
            }

            if (!isset($params[self::DIR])
            || !in_array(strtolower($params[self::DIR]), array('asc', 'desc'))) {
                $params[self::DIR] = 'asc';
            }

            $orderClause = $this->getAlias($params[self::SORT], false) . " " . strtoupper($params[self::DIR]);
            return $this->_selectStatement->order($orderClause);
        }

        // Multiple sorting
        if (!is_array($sorters)) {
            return $this->_selectStatement;
        }

        foreach ($sorters as $sort) {

            if (in_array($sort[self::MSORT], $this->_fields)) {

                if (!isset($sort[self::MDIR])
                || !in_array(strtolower($sort[self::MDIR]), array('asc', 'desc'))) {
                    $sort[self::MDIR] = 'asc';
                }

                $orderClause = $this->getAlias($sort[self::MSORT], false)
                             . " " . strtoupper($sort[self::MDIR]);
                $this->_selectStatement->order($orderClause);
            }

        }

        return $this->_selectStatement;
    }

    /**
     * Parse limit params and add this to statement
     *
     * @param array $params            params
     * @return Zend_Db_Select          the modified statement
     */
    public function parseLimits($params = null)
    {
        if (true !== $this->_allowLimit) {
            return $this->_selectStatement;
        }

        if (!isset($params)) {
            $params = $this->_params;
        }

        if (empty($params[self::LIMIT]) || !isset($params[self::START])) {
            return $this->_selectStatement;
        }

        return $this->_selectStatement->limit($params[self::LIMIT], $params[self::START]);
    }

    /**
     * Parse filter params and add this to statement
     *
     * @param array $params            params
     * @return Zend_Db_Select          the modified statement
     */
    public function parseFilters(array $params = array())
    {
        if (empty($params)) {
            $params = $this->_params;
        }

        if (!array_key_exists(self::FILTER, $params) || !is_array($params[self::FILTER])) {
            return $this->_selectStatement;
        }

        foreach ($params[self::FILTER] as $filter) {

            if (empty($filter['data'])) {
                continue;
            }
            $data = $filter['data'];

            if (empty($filter['field']) || empty($data['type']) || !isset($data['value'])) {
                continue;
            }

            $field = $filter['field'];
            $value = $data['value'];

            if ('search' != $data['type']) {
                if (!in_array($field, $this->_fields)) {
                    continue;
                }
                $field = $this->getAlias($field);
            }

            switch($data['type']) {
                case 'string':
                    $this->_selectStatement->where($field
                        . $this->_adapter->quoteInto(' LIKE ?', '%' . $value. '%'));
                    break;

                case 'stringstrict':
                    $this->_selectStatement->where($field . ' = ?', $value);
                    break;

                case 'search':
                    $fields = explode(',', $field);
                    if (empty($fields)) {
                        continue;
                    }

                    $collection = array();
                    foreach ($fields as $field) {
                        $field = trim($field);
                        if (!in_array($field, $this->_fields)) {
                            continue;
                        }

                        $field = $this->getAlias($field);
						if (preg_match('!^(\d{2})[.\/-](\d{2})[.\/-](\d{2,4})$!', $value, $matches)) {
                            $value = $matches[3] . '-' . $matches[2] . '-' . $matches[1];
						}

                        $collection[] = $this->_adapter->quoteInto($field . ' LIKE ?', '%' . $value . '%');
                    }

                    if (!empty($collection)) {
                        $this->_selectStatement->where(join(' OR ', $collection));
                    }
                    break;

                case 'list' :
                    if (false !== strpos($value, ',')) {
                        $value = explode(',', $value);
                    } else {
                        $value = (array) $value;
                    }

                    $this->_selectStatement->where($field
                        . ' IN (' . $this->_adapter->quote($value) . ')');
                    break;

                case 'boolean':
                    $this->_selectStatement->where($filter . ' = ?', $value);
                    break;

                case 'numeric' :
                    if (empty($data['comparison'])) {
                        continue;
                    }

                    switch ($data['comparison']) {
                        case 'eq':
                            $this->_selectStatement->where($field . ' = ?', $value);
                            break;

                        case 'lt':
                            $this->_selectStatement->where($field . ' < ?', $value);
                            break;

                        case 'gt':
                            $this->_selectStatement->where($field . ' > ?', $value);
                            break;

                        case 'neq':
                            $this->_selectStatement->where($field . ' != ?', $value);
                            break;
                    }
                    break;

                case 'date':
                    if (empty($data['comparison'])) {
                        continue;
                    }

                    switch ($data['comparison']) {
                        case 'eq':
                            $this->_selectStatement->where($field . ' = ?', date('Y-m-d', strtotime($value)));
                            break;

                        case 'lt':
                            $this->_selectStatement->where($field . ' < ?', date('Y-m-d', strtotime($value)));
                            break;

                        case 'gt':
                            $this->_selectStatement->where($field . ' > ?', date('Y-m-d', strtotime($value)));
                            break;
                    }
                    break;

                default:
                    break;

            }
        }

        return $this->_selectStatement;
    }

    /**
     * Get column alias
     *
     * @param string $field     The field name
     * @param bool $escape      Escape flag
     *      If true then escape via adapter quote indentifier
     * @return string           The field name
     */
    public function getAlias($field, $escape = true)
    {
        $index = array_search($field, $this->_fields);
        if (!is_int($index)) {
            $field = $index;
        }

        if (true === $escape) {
            $field = $this->_adapter->quoteIdentifier($field);
        }

        return $field;
    }

    /**
     * Set limit avialable
     *
     * @param bool $flag
     * @return Xend_Db_Plugin_Select
     */
    public function allowLimit($flag)
    {
        $this->_allowLimit = (boolean) $flag;
        return $this;
    }

    /**
     * Allow set SQL_CALC_FOUND_ROWS query
     */
    public function setSqlCalcFoundRows($flag)
    {
    	$this->_sqlCalcFoundRows = (boolean) $flag;
    	return $this;
    }

	/**
	 * Change plugin strategy
	 *
	 * @param string $strategy
	 * @return Xend_Db_Plugin_Select
	 */
	public function setStrategy($strategy)
	{
		if (!in_array($strategy, array(self::STRATEGY_COMBO, self::STRATEGY_GRID))) {
			throw new Exception("The type `$strategy` is not allowed.");
		}

		$this->_strategy = $strategy;
		return $this;
	}

    /**
     * Calculate total count
     *
     * @return int|false
     */
    public function getTotalCount()
    {
        $s = clone $this->_selectStatement;
        $s->reset(Zend_Db_Select::COLUMNS);
        $s->reset(Zend_Db_Select::LIMIT_COUNT);
        $s->reset(Zend_Db_Select::LIMIT_COUNT);
        $s->reset(Zend_Db_Select::ORDER);
        $s->reset(Zend_Db_Select::GROUP);

        $s->columns(array('c' => new Zend_Db_Expr('COUNT(*)')));

        try {
            $count = $s->query()->fetchColumn(0);
            return $count;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }

            return false;
        }
    }

    /**
     * Calculate total count via SQL_CALC_FOUND_ROWS param
     *
     * @return int|false
     */
	public function getTotalCountSql()
	{
		if (true !== $this->_sqlCalcFoundRows) {
			throw new Xend_Db_Exception('The option `SQL_CALC_FOUND_ROWS is not allowed.');
		}

		try {
			$count = $this->_adapter->query('SELECT FOUND_ROWS()')->fetchColumn(0);
		} catch (Exception $e) {
			if (DEBUG) {
                throw $e;
            }

            $count = false;
		}

		return $count;
	}
}