var UserModel = Backbone.Model.extend({
        
		defaults: {
			title: 'Ms.',
			name: 'Melanie',
			email: 'melaniemcganney@gmail.com',
			birthday: '',
			password: 'juniper'
		},


        /*schema: {
            title:      { type: 'Select', options: ['', 'Mr', 'Mrs', 'Ms'] },
            name:       'Text',
            email:      { validators: ['required', 'email'] },
            birthday:   'Date',
            password:   'Password',
            notes:      { type: 'List', itemType: 'Text' }
        }*/
    });
    