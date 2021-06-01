import {getApiUrl} from '@/util/getApiUrl';
import {request, ResponseType} from '@/util/request';

import {ContactsDto} from './dto';

export const sendContacts = (body: ContactsDto): Promise<ResponseType<Record<string, unknown>>> =>
    request(
        getApiUrl('/forms/becomeSalon'),
        {method: 'POST', body: JSON.stringify(body)},
    );
