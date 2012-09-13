define(['js/data/Model'], function(Model) {
    return Model.inherit('app.model.Project', {
        defaults: {
            name: '',
            key: ''
        }
    })
});

