'use strict';
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});


///////////////////////////////////////////////////////////////////////////
/////////////////////////////// FUNCTIONS /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// PULL DOCKER IMAGE BY NAME
///////////////////////////////////////////////////////////////////////////
var pull_docker = function(req, res) {
  // GET REPO_NAME FROM BODY
  let repo_name = req.body.repo_name;

  // PULL DOCKER IMAGE
  docker.pull(repo_name, function (err, stream) {
    if (err) { // IF ERROR SEND ERR
      res.send(err);
    } else { // FOLLOW PROGRESS AND LOG
      docker.modem.followProgress(stream, onFinished, onProgress);

      // ON FINISH RETURN IMAGE
      function onFinished(err, output) {
        res.send(output);
      }

      function onProgress(event) {
        console.log(JSON.stringify(event));
      }
    }
  });
};

///////////////////////////////////////////////////////////////////////////
// CREATE CONTAINER FROM SPECIFIED IMAGE NAME
///////////////////////////////////////////////////////////////////////////
var create_container = function(req, res) {
  // GET REPO_NAME FROM BODY
  let img = req.body.repo_name;

  // OPTIONS OBJECT
  let opts = {
    "image": img
  };

  // CREATE CONTAINER FROM IMAGE NAME
  docker.createContainer(opts, function (err, container) {
    if (err) {
      res.send(err);
    } else {
      res.json(container);
    }
  });
};

///////////////////////////////////////////////////////////////////////////
// START CONTAINER
///////////////////////////////////////////////////////////////////////////
var start_container = function(req, res) {
  // GET ID FROM PARAMS
  let id = req.params.id;
  // GET CONTAINER OBJECT
  let container = docker.getContainer(id);

  // START CONTAINER
  container.start(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

///////////////////////////////////////////////////////////////////////////
// STOP CONTAINER
///////////////////////////////////////////////////////////////////////////
var stop_container = function(req, res) {
  // GET ID FROM PARAMS
  var id = req.params.id;
  // GET CONTAINER OBJECT
  var container = docker.getContainer(id);

  // STOP CONTAINER
  container.stop(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

///////////////////////////////////////////////////////////////////////////
// DELETE CONTAINER
///////////////////////////////////////////////////////////////////////////
var delete_container = function(req, res) {
  // GET ID FROM PARAMS
  let id = req.params.id;
  // GET CONTAINER OBJECT
  let container = docker.getContainer(id);
  
  // OPTIONS OBJECT
  let opts = {
    "id": id
  };

  // DELETE CONTAINER
  container.remove(opts, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

///////////////////////////////////////////////////////////////////////////
// GET STATS OF CONTAINER
///////////////////////////////////////////////////////////////////////////
var get_stats_of_container = function(req, res) {
  // GET ID FROM PARAMS
  let id = req.params.id;
  // GET CONTAINER OBJECT
  let container = docker.getContainer(id);

  // OPTIONS OBJECT
  let opts = {
    "stream": false,
  };

  // GET STATS OF CONTAINER ONCE, NOT AS A STREAM
  container.stats(opts, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

///////////////////////////////////////////////////////////////////////////
// GET LOGS OF CONTAINER
///////////////////////////////////////////////////////////////////////////
var get_logs_of_container = function(req, res) {
  // GET ID FROM PARAMS
  var id = req.params.id;
  // GET CONTAINER OBJECT
  var container = docker.getContainer(id);

  // OPTIONS OBJECT
  let opts = {
    "follow": false,
    "stdout": true,
    "stderr": true,
    "tail:": 2
  };

  // GET LOGS OF CONTAINER ONCE, NOT AS A STREAM
  container.logs(opts, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

///////////////////////////////////////////////////////////////////////////
// GET LIST OF CONTAINERS
///////////////////////////////////////////////////////////////////////////
var get_list_of_containers = function(req, res) {
  // GET ALL CONTAINERS
  docker.listContainers({all: true}, function(err, containers) {
    if (err) {
      res.send(err);
    } else {
      res.json(containers);
    }
  });
};

///////////////////////////////////////////////////////////////////////////
// GET LIST AVAILABLE IMAGES
///////////////////////////////////////////////////////////////////////////
var get_list_of_images = function(req, res) {
  // GET ALL AVAILABLE IMAGES
  docker.listImages({all: true}, function(err, images) {
    if (err) {
      res.send(err);
    } else {
      res.json(images);
    }
  });
};


///////////////////////////////////////////////////////////////////////////
/////////////////////////////// EXPORTS ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////


module.exports = {
  pull_docker,
  create_container,
  start_container,
  stop_container,
  delete_container,
  get_stats_of_container,
  get_logs_of_container,
  get_list_of_containers,
  get_list_of_images,
};
