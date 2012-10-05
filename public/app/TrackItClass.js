define(
    ["js/core/Application","app/model/Project","js/data/DataSource", "flow", "js/data/Collection", "app/model/Ticket"],
    function (Application, Project, DataSource, flow, Collection, Ticket) {

        return Application.inherit({

            defaults: {
                project: null,
                ticket: null,
                selectedProject: null,
                selectedTicket: null,
                message: null,
                projects: null,
                tickets: null
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
                var tickets = this.$.api.createCollection(Collection.of(Ticket), {});
                this.set('projects', projects);
                this.set('tickets', tickets);
                this.set('ticket', tickets.createItem());
                this.set('project', projects.createItem());
                flow()
                    .seq(function(cb){
                        projects.fetch(null, cb);
                    })
                    .seq(function (cb) {
                        tickets.fetch(null, cb);
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
            _commitSelectedTicket: function(ticket){
                if(ticket){
                    ticket.$.comments.fetch({fullData: true}, function(err){
                        console.log(err);
                    });
                }
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
            },
            _handleSave: function(e){
                var project = e.target.find('$project');
                if(project){
                    project.save();
                }
                e.preventDefault();
            },
            _handleSaveTicket: function(e){
                var self = this;
                this.$.ticket.save(null, function(err, ticket){
                    if(!err){
                        self.$.tickets.add(ticket);
                        self.set('ticket', self.$.tickets.createItem());
                    }else{
                        self.log(err);
                    }
                });

                e.preventDefault();
            },
            _handleSaveComment: function(e){
                if(this.$.message && this.$.selectedTicket){

                    var comments = this.$.selectedTicket.$.comments;
                    var comment = comments.createItem();
                    comment.set('message', this.$.message);
                    this.set('message', '');
                    comment.save(null, function(err){
                        if(!err){
                            comments.add(comment);
                        }
                        console.log(err);
                    });
                }
                e.preventDefault();
            },
            _handleMessage: function(e){
                var message = e.target.find('$comment');
                if(message){
                    message.validate();
                    // message.save();
                }

                e.preventDefault();
            },
            _deleteMessage: function(e){
                var message = e.target.find('$comment');
                if (message) {
                    message.remove({}, function(err){
                        if(!err){
                            message.$collection.remove(message);
                        }
                    });
                }

                e.preventDefault();
            }
        });
    }
);