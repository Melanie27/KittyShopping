var UserModel = Backbone.Model.extend({
        
		defaults: {
			title: 'Ms.',
			name: '',
            email: 'melaniemcganney@gmail.com',
            address1: '927 5th Street',
            address2: 'Apt 3',
            city: '',
            state: 'CA',
            zipcode: '90403',
			birthday: '',
            username: 'MellyEG96',
			password1: 'juniper',
            password2: '',
            petname: 'Titty Bar Bob'

		},


        schema: {
            
            title: { type: 'Select', options: ['Mr.', 'Mrs.', 'Ms.']},
            name: { type: 'Text', title: 'Both Names', validators: ['required'] },
            email:   { validators: ['required', 'email'] },
            address1:  { type: 'Text', validators: ['required']},
            address2: 'Text',
            zipcode: { type: 'Number', validators: ['required']},
            name:       'Text',
            password: { validators: [
                { type: 'match', field: 'passwordConfirm', message: 'Passwords must match!' }
            ] },
            password: { validators: [
                { type: 'match', field: 'passwordConfirm', message: 'Passwords must match!' }
            ] },
            password2:   { type: 'Password', validators: ['required']},
            petname: 'Text'
    }

    });
    