import httpService from "../../service/http.service";

class uploadFileAdapterCKEditor {
    constructor(loader, idTheme, idArticle) {
        this.loader = loader;
        this.idTheme = idTheme;
        this.idArticle = idArticle;
    }

    upload() {
        /*
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
            */
        this.http = httpService.http;
        return this.loader.file
            .then(file => {
                return new Promise((resolve, reject) => {
                    const data = new FormData();
                    data.append('image_upload', file);
                    data.append('theme_id', this.idTheme);
                    data.append('article_id', this.idArticle);
                    this.http.post('/upload', data)
                        .then(response => {
                            if (response.status === 200) {
                                resolve({
                                    default: response.data.default
                                });
                            } else {
                                reject(response.data.message);
                            }
                        }).catch(response => {
                            reject('Ошибка загрузки');
                        });
                })
            })
    }

    abort() {
        if (this.http) {
            this.http.onabort();
        }
    }

    _initRequest() {
        this.http = httpService.http;
    }

    _initListeners(resolve, reject, file) {
        const http = this.http;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;
        http.onprogress = (evt) => {
            if (evt.lengthComputable) {
                loader.uploadTotal = evt.total;
                loader.uploaded = evt.loaded;
            }
        };

        http.defaults.onError = () => reject(genericErrorText);
        http.onabort = () => reject();
        http.onload = () => {
            const response = http.response
            console.log('fdsfsd')
            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            resolve({
                default: response.default
            });
        }
    }

    _sendRequest(file) {
        const data = new FormData();
        const http = this.http;
        data.append('image_upload', file);
        data.append('theme_id', this.idTheme);
        http.post('/upload', data);
    }

}

export default uploadFileAdapterCKEditor;