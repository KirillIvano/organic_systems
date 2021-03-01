import {getApiUrl} from '@/util/getApiUrl';
import {request, ResponseType} from '@/util/request';

import {WorkshopPreviewDto} from './dto';

export const getWorkshops = (): Promise<ResponseType<{workshops: WorkshopPreviewDto[]}>> =>
    request(getApiUrl('/workshops'));
