define(['js/data/Model'], function(Model) {
    return Model.inherit('app.model.User', {
        defaults: {
            username: '',
            email: ''
        }
    })
});

