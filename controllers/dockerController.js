'use strict';
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});


///////////////////////////////////////////////////////////////////////////
/////////////////////////////// FUNCTIONS /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//////////////// PULL DOCKER IMAGE BY NAME ////////////////
var pull_docker = function(req, res) {
  let repo_name = req.body.repo_name;
  console.log('Req: ' + repo_name);

  docker.pull(repo_name, function (err, stream) {
    if (err) {
      res.send(err);
    } else {
      docker.modem.followProgress(stream, onFinished, onProgress);

      function onFinished(err, output) {
        res.send(output);
      }

      function onProgress(event) {
        console.log(JSON.stringify(event));
      }
    }
  });
};

//////////////// CREATE CONTAINER FROM SPECIFIED IMAGE NAME ////////////////
var create_container = function(req, res) {
  let img = req.body.repo_name;
  // console.log("body NAME: " + JSON.stringify(req.body));
  let opts = {
    "image": img
  };

  docker.createContainer(opts, function (err, container) {
    if (err) {
      // console.log(JSON.stringify(err));
      res.send(err);
    } else {
      res.json(container);
    }
  });
};

//////////////// START CONTAINER ////////////////
var start_container = function(req, res) {
  var id = req.params.id;
  var container = docker.getContainer(id);

  container.start(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

//////////////// STOP CONTAINER ////////////////
var stop_container = function(req, res) {
  var id = req.params.id;
  var container = docker.getContainer(id);

  container.stop(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};


//////////////// DELETE CONTAINER ////////////////
var delete_container = function(req, res) {
  var id = req.params.id;
  var container = docker.getContainer(id);
  var opts = {
    "id": id
  };

  container.remove(opts, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

//////////////// GET STATS OF CONTAINER ////////////////
var get_stats_of_container = function(req, res) {
  var id = req.params.id;
  var container = docker.getContainer(id);
  // console.log("Cont: " + JSON.stringify(container));

  let opts = {
    "stream": false,
  };

  container.stats(opts, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

//////////////// GET LOGS OF CONTAINER ////////////////
var get_logs_of_container = function(req, res) {
  var id = req.params.id;
  var container = docker.getContainer(id);

  let opts = {
    "follow": false,
    "stdout": true,
    "stderr": true,
    "tail:": 2
  };

  container.logs(opts, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

//////////////// GET LIST OF CONTAINERS ////////////////
var get_list_of_containers = function(req, res) {
  // res.json({"success": true});
  // return new Promise((resolve, reject) => {
    docker.listContainers({all: true}, function(err, containers) {
      if (err) {
        // console.log(JSON.stringify(err));
        // reject(err);
        res.send(err);
      } else {
        // console.log(JSON.stringify(containers));
        // resolve(containers);
        res.json(containers);
      }
    });
  // });
};

//////////////// GET LIST AVAILABLE IMAGES ////////////////
var get_list_of_images = function(req, res) {
  docker.listImages({all: true}, function(err, images) {
    if (err) {
      // console.log(JSON.stringify(err));
      res.send(err);
    } else {
      // console.log(JSON.stringify(images));
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
