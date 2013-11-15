/**
 * Uploader implementation - with the Connection object in ExtJS 4
 * 
 */
Ext.define('xlib.upload.uploader.ExtJsUploader', {
    extend : 'xlib.upload.uploader.AbstractUploader',

    requires : [
        'xlib.upload.data.Connection'
    ],

    /**
     * @property
     * 
     * The connection object.
     */
    conn : null,

    /**
     * @private
     * 
     * Initializes and returns the connection object.
     * 
     * @return {xlib.upload.data.Connection}
     */
    initConnection : function() {
        var url = this.url;
        if (this.params) {
            url = Ext.urlAppend(url, Ext.urlEncode(this.params));
        }

        var conn = Ext.create('xlib.upload.data.Connection', {
            disableCaching : true,
            method : this.method,
            url : url,
            timeout : this.timeout,
            defaultHeaders : {
                'Content-Type' : this.contentType,
                'X-Requested-With' : 'XMLHttpRequest'
            }
        });

        return conn;
    },

    /**
     * Implements {@link xlib.upload.uploader.AbstractUploader#uploadItem}
     * 
     * @param {xlib.upload.Item} item
     */
    uploadItem : function(item) {
        var file = item.getFileApiObject();
        if (!file) {
            return;
        }

        item.setUploading();

        this.conn = this.initConnection();

        var headers = this.initHeaders(item);
        
        this.conn.request({
            scope : this,
            headers : headers,
            xmlData : file,
            params: headers,

            success : Ext.Function.bind(this.onUploadSuccess, this, [
                    item
                ], true),
            failure : Ext.Function.bind(this.onUploadFailure, this, [
                    item
                ], true),
            progress : Ext.Function.bind(this.onUploadProgress, this, [
                    item
                ], true)
        });
    },

    /**
     * Implements {@link xlib.upload.uploader.AbstractUploader#abortUpload}
     */
    abortUpload : function() {
        if (this.conn) {
            this.conn.abort();
        }
    },

    onUploadSuccess : function(response, options, item) {
        var info = {
            success : false,
            message : 'general error',
            response : response
        };

        if (response.responseText) {
            var responseJson = Ext.decode(response.responseText);
            if (responseJson && responseJson.success) {
                Ext.apply(info, {
                    success : responseJson.success,
                    message : responseJson.message
                });

                this.fireEvent('uploadsuccess', item, info);
                return;
            }

            Ext.apply(info, {
                message : responseJson.message
            });
        }

        this.fireEvent('uploadfailure', item, info);
    },

    onUploadFailure : function(response, options, item) {
        var info = {
            success : false,
            message : 'http error',
            response : response
        };

        this.fireEvent('uploadfailure', item, info);

        this.failure.apply(this.scope, [
                item, info
            ]);
    },

    onUploadProgress : function(event, item) {
        this.fireEvent('uploadprogress', item, event);
    }
});