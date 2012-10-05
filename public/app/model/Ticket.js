define(['js/data/Model', 'app/model/Project', 'app/model/Comment', 'js/data/Collection'], function(Model, Project, Comment, Collection) {
    return Model.inherit('app.model.Ticket', {
        defaults: {
            subject: '',
            description: '',
            reporter: null,
            assigned: null,
            state: 0
        },
        schema: {
            project: Project,
            comments: Collection.of(Comment)
        }
    })
});