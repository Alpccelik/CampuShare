import { BaseEntity } from './../../shared';

export class Event implements BaseEntity {
    constructor(
        public id?: number,
        public maxPeople?: number,
        public category?: string,
        public description?: string,
        public startDate?: any,
        public endDate?: any,
        public adress?: string,
        public userLogin?: string,
        public userId?: number,
    ) {
    }
}
