import { expect, should} from 'chai';
import { describe, it } from 'mocha';


import * as utils from "./../src/utils";
import * as moment from 'moment';


describe('Hello function', () => {
    it('should return true', () => {
        const result = utils.isBetween(moment(), moment().add(-2, 'day'), moment().add(1, 'day'));        
        expect(result).to.equal(true);
    });
});