import configFile from "../config.json";
import httpService from "../service/http.service";

class uploadFileAdapterCKEditor {
    constructor(loader, idTheme) {
        this.loader = loader;
        this.idTheme = idTheme;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._initRequest();
                // this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    abort() {
        /*
        if (this.xhr) {
            this.xhr.abort();
        }
        */
    }

    _initRequest() {
        this.xhr = httpService;
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            resolve({
                default: response.url
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest(file) {
        const data = new FormData();
        data.append('image_upload', file);
        data.append('theme_id', this.idTheme);
        this.xhr.post('/upload', data);
    }
}

export default uploadFileAdapterCKEditor;