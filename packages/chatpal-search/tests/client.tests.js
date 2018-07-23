/* eslint-env mocha */
import assert from 'assert';
import './client.mocks.js';

import {queryBuilder} from '../server/query/queryBuilder';

describe('Query Builder: ', () => {
	it('parses query "test von:mir" in de', () => {
		const query = queryBuilder.build('test von:mir', 'de');
		assert.equal(1, query.filters.from.length);
		assert.equal('tkurz', query.filters.from[0]);
		assert.equal('test', query.text);
	});
	it('fails to parses query "from:tkurz" in de', () => {
		const query = queryBuilder.build('from:tkurz', 'de');
		assert.equal(0, query.filters.from.length);
	});
	it('parses query "from:tkurz" in en', () => {
		const query = queryBuilder.build('from:tkurz', 'en');
		assert.equal(1, query.filters.from.length);
		assert.equal('tkurz', query.filters.from[0]);
		assert.equal('', query.text);
	});
	it('parses query "test von:tkurz test2" in de', () => {
		const query = queryBuilder.build('test von:tkurz test2', 'de');
		assert.equal(1, query.filters.from.length);
		assert.equal('tkurz', query.filters.from[0]);
		assert.equal('test test2', query.text);
	});
});

