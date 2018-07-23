import mock from 'mock-require';

mock('meteor/rocketchat:logger', {
	Logger: class {
		info() {

		}
	}
});

global.Meteor = {
	user: () => {
		return {username:'tkurz'};
	}
};
