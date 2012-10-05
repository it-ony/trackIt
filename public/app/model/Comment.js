define(['js/data/Model', 'js/data/validator/RegExValidator'], function(Model, RegExValidator) {
    return Model.inherit('app.model.Comment', {
        defaults: {
            message: ''
        },
        schema: {
            message: String,
            created: Date
        },
        validators: [
            new RegExValidator({
                field: 'message',
                regEx: /\be(\w*)s\b/
            })
        ]
    })
});