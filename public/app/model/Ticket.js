define(['js/data/Model', 'app/model/Project'], function(Model, Project) {
    return Model.inherit('app.model.Ticket', {
        defaults: {
            subject: '',
            description: '',
            reporter: null,
            assigned: null,
            state: 0,

            project: Project
        }
    })
});