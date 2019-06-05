'use strict';
module.exports = function(app) {
  var dockerList = require('../controllers/dockerController');

  // PULL DOCKER IMAGE BY NAME
  app.route('/pull_docker/:user?/:repo_name')
    .get(dockerList.pull_docker);

  // CREATE CONTAINER FROM SPECIFIED IMAGE NAME (enhariharan/infinite-loop)
  app.route('/create_container/:user?/:repo_name')
    .post(dockerList.create_container);

  // START CONTAINER
  app.route('/start_container/:id')
    .post(dockerList.start_container);
  
  // STOP CONTAINER
  app.route('/stop_container/:id')
    .post(dockerList.stop_container);

  // DELETE CONTAINER
  app.route('/delete_container/:id')
    .post(dockerList.delete_container);

  // GET STATS OF CONTAINER
  app.route('/get_stats_of_container/:id')
    .get(dockerList.get_stats_of_container);

  // GET LIST OF CONTAINERS
  app.route('/get_list_of_containers/')
    .get(dockerList.get_list_of_containers);

  // GET LIST AVAILABLE IMAGES
  app.route('/get_list_of_images/')
    .get(dockerList.get_list_of_images);



};
