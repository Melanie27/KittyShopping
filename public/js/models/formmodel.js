var FormModel = Backbone.Model.extend({
	schema: {
        title:      { type: 'Select', options: ['Mr', 'Mrs', 'Ms'] },
        name:       'Text',
        email:      { validators: ['required', 'email'] },
        birthday:   'Date',
        password:   'Password',
        address:    { type: 'NestedModel', model: UserModel },
        notes:      { type: 'List', itemType: 'Text' }
    }

})