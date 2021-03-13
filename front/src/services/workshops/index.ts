import {getApiUrl} from '@/util/getApiUrl';
import {request, ResponseType} from '@/util/request';

import {TutorDto, WorkshopPreviewDto} from './dto';

export const getWorkshops = (): Promise<ResponseType<{workshops: WorkshopPreviewDto[]}>> =>
    request(getApiUrl('/workshops'));

export const getAllTutors = (): Promise<ResponseType<{tutors: TutorDto[]}>> =>
    request(getApiUrl('/tutor/all'));
