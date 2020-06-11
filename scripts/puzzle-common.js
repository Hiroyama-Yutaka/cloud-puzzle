function judgeAllPieces(map) {
  var result = true;
  boxes = new Array()

  var childs = document.getElementById("puzzle").childNodes; 
  for (var i=0; i < childs.length; i++ ) {
    if (childs[i].classList === undefined) {
      continue;
    }
    if (childs[i].classList.contains("box")) {
      boxes.push(childs[i]);
    }
  }
                    
  map.forEach(function(value, key){
    var piece = document.getElementById(key);

    var correctboxes = new Array();
    for (var i=0; i < boxes.length; i++ ) {
      if (value.includes(boxes[i].id)) {
        correctboxes.push(boxes[i]);
      }
    }

    ret = judgePiece(piece, correctboxes)
    if(!ret) {
      result = result && ret;
  
      return; // Callback
    }
  });
  
  return result;
}
  
  
function judgePiece(piece, correctboxes) {
  for(var i=0; i < correctboxes.length; i++ ) {
    if (isPieceInBox(piece, correctboxes[i])) {
      return true;
    }
  }

  console.log('Error: %s', piece.id);
  return false;
}

function isPieceInBox(piece, box) {
  const piece_pos = $(piece).position();
  const box_pos = $(box).position();
  const box_width = $(box).width();
  const box_height = $(box).height();
  const buffer = 20;

  if (piece_pos.top < box_pos.top - buffer) {
    console.log('piece_pos.top: %d, box_pos.top: %d', piece_pos.top, box_pos.top);
    return false;
  }
  if (piece_pos.top > box_pos.top + box_height + buffer) {
    console.log('piece_pos.top: %d, box_pos.top: %d', piece_pos.top, box_pos.top);
    return false;
  }
  if (piece_pos.left < box_pos.left - buffer) {
    return false;
  }
  if (piece_pos.left > box_pos.left + box_width + buffer) {
    return false;
  }

  return true;
}