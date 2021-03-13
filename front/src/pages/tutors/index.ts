import {Tutor} from '@/domain/workshops/types';
import {getAllTutors} from '@/services/workshops';
import {getFileUrl} from '@/util/getFileUrl';

class MentorsSection {
    private mentorsRow: HTMLDivElement;

    constructor() {
        this.mentorsRow = document.getElementById('all-mentors') as HTMLDivElement;
    }

    private getTutorTemplate = (tutor: Tutor) => (
        `
        <div class="mentor mentors-row__item">
            <div aria-hidden="true" class="mentor__picture-container">
                <img 
                    class="mentor__picture"
                    src="${tutor.image}"
                >
            </div>

            <p class="mentor__name mt-4">${tutor.name}</p>
            <p class="mentor__info">${tutor.info}</p>

            <div class="mentor__underliner hr_sm hr_centered"></div>
        </div>
        `
    )

    private renderTutors = (tutors: Tutor[]) =>
        this.mentorsRow.insertAdjacentHTML(
            'afterbegin',
            tutors.map(this.getTutorTemplate).join(''),
        )

    async init() {
        const res = await getAllTutors();

        if (res.ok) {
            const {tutors} = res.data;

            const clientifiedTutors = tutors.map(tutor => ({
                ...tutor,
                image: getFileUrl(tutor.image),
            }));

            this.renderTutors(clientifiedTutors);
        }
    }
}

const mentorsSection = new MentorsSection();

mentorsSection.init();
