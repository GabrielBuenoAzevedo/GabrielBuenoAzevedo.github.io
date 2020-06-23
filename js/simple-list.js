const button = document.getElementById('button');
const nodes = document.getElementsByClassName('node');
const node_container = document.getElementById('node-container');
const max_animation_time = 1500;
let creating = false;
let creation_queue = [];

//Create a new node for the list.
createNewNode = () => {
  const animation_time = startAnimation();
  window.setTimeout( () => {
    const new_node = document.createElement('div');
    new_node.classList.add('node');
    node_container.appendChild(new_node);
    creation_queue.shift();
    runCreationQueue();
  }, animation_time);
}

//Starts last node's arrow animation. Returns time to execute the animation.
startAnimation = () => {
  if (nodes.length > 0){
    const last_node = nodes[nodes.length-1];
    last_node.classList.add('node-arrow');
    return max_animation_time;
  }
  return 0;
}

//Adds createNode to creation queue
addNodeToCreationQueue = () => {
  let animation_time = 0;
  if (creation_queue.length > 0){
    animation_time = max_animation_time;
  }
  creation_queue.push(animation_time);
  if (creation_queue.length === 1) {
    creating = true;
    runCreationQueue();
  }
}

//Starts running creation queue
runCreationQueue = () => {
  if (creation_queue.length > 0){
    const animation_time = creation_queue[0];
    console.log(animation_time)
    window.setTimeout( () => {
      createNewNode();
    }, animation_time)
  } 
}

button.onclick = addNodeToCreationQueue;

