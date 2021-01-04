import './styles.scss';

export class Video {
    private videoPreview: HTMLDivElement;
    private videoPreviewImage: HTMLImageElement;
    private src: string;
    private previewSrc: string;

    constructor(
        private videoEl: HTMLDivElement,
    ) {
        this.videoPreview = this.videoEl.getElementsByClassName('video__preview')[0] as HTMLDivElement;
        this.videoPreviewImage = this.videoPreview.getElementsByClassName(
            'video__image',
        )[0] as HTMLImageElement;

        const src = this.videoEl.dataset['src'];
        if (!src) {
            throw new Error('Не задан data-src у видео');
        }

        const previewSrc = this.videoEl.dataset['previewsrc'];
        if (!previewSrc) {
            throw new Error('Не задан data-previewSrc у видео');
        }

        this.src = src;
        this.previewSrc = previewSrc;
    }

    init(): void {
        this.showPreview();
    }

    private showPreview() {
        this.videoPreviewImage.src = this.previewSrc;

        this.videoPreview.addEventListener('click', this.handlePreviewClick);
    }

    private handlePreviewClick = () => {
        this.videoEl.insertAdjacentHTML('afterbegin', this.getIFrameTemplate());

        this.hidePreview();
    }

    private getIFrameTemplate() {
        return (`
            <iframe
                src=${this.src}
                class="video__frame"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                autoplay
            ></iframe>
        `);
    }

    private hidePreview() {
        this.videoPreview.remove();
    }
}
