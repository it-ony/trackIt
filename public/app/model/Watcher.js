define(['js/data/Model', 'app/model/User'], function(Model, User) {
    return Model.inherit('app.model.Watcher', {
        schema: {
            user: User
        }
    })
});

