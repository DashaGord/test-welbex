import {AppModel} from "../Model/AppModel";
import {AvailableModel} from "../Model/AvailableModel";

class DataService {

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }


    getComments = async () => {
        const res = await this.getResource(`http://localhost:3001/comments`);
        let count = res.count;
        let values = res.value.map(v => {
            return new AppModel(v.id, v.year, v.name, v.lot, v.distance)
        });
        return new AvailableModel(count, values);
    }


    getCommentsPaginate = async (page) => {
        const res = await this.getResource(`http://localhost:3001/comments?page=${page}`);
        let count = res.count;
        let values = res.value.map(v => {
            return new AppModel(v.id, v.year, v.name, v.lot, v.distance)
        });
        return new AvailableModel(count, values);
    }

    getCommentsWithParams = async (columnName, condition, value, page) => {
        let url = `http://localhost:3001/comments?columnName=${columnName}&condition=${condition}&value=${value}&page=${page}`;
        console.log(url);
        const res = await this.getResource(url);
        let count = res.count;
        let values = res.value.map(v => {
            return new AppModel(v.id, v.year, v.name, v.lot, v.distance)
        });
        return new AvailableModel(count, values);
    }
}
export default DataService;