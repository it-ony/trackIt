define(
    ["js/core/Application","app/model/Project","js/data/DataSource", "flow", "js/data/Collection"],
    function (Application, Project, DataSource, flow, Collection) {

        return Application.inherit({

            defaults: {
                project: null,
                projects: Array
            },
            inject: {
                api: DataSource
            },

            /***
             * Starts the application
             * @param parameter
             * @param callback
             */
            start:function (parameter, callback) {

                var self = this;
                var projects = this.$.api.createCollection(Collection.of(Project), {});
                this.set('projects', projects);
                this.set('project', projects.createItem());
                flow()
                    .seq(function(cb){
                        projects.fetch(null, cb);
                    })
                    .exec(function(err){
                        if (err) {
                            callback(err);
                        } else {
                            // call start from super
                            self.start.baseImplementation.call(self, parameter, callback);
                        }
                    });
            },
            _handleProjectSubmit: function(e){
                var self = this;
                this.$.project.save(null, function(err, project){
                    if(!err){
                        self.$.projects.add(project);
                        self.set('project', self.$.projects.createItem());
                    }else{
                        self.log(err);
                    }
                });
                e.preventDefault();
            }
        });
    }
);