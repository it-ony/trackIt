define(['js/data/Model', 'js/data/validator/EmailValidator'], function(Model, EmailValidator) {
    return Model.inherit('app.model.Comment', {
        defaults: {
            message: ''
        },
        schema: {
            message: String,
            created: Date
        },
        validators: [
            new EmailValidator({
                field: 'message',
                errorMessage: ''
            })
        ]
    })
});