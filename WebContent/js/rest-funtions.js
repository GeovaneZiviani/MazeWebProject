var host = "http://localhost:8080/MazeWebProjec/services/";

function listPlayers() {
  $.ajax({
    url: host + 'players',
    type: 'GET',
    headers: {
    Accept: 'application/json'
    },
    success: function(data) {
      $('#grid tr:gt(0)').remove();
      if ($.isArray(data.players.link)) {
        for (var i = 0; i < data.players.link.length; i++) {
          var link = data.players.link[i]['@href'];
          fallowPlayerLink(link);
        }
      } else {
        var link = data.players.link['@href'];
        fallowPlayerLink(link);
      }
    },
    error: function(data) {
      lert("Erro na invocacao");
    }
  });
}

function fallowPlayerLink(link) {
  $.ajax({
    url: host + link,
    type: 'GET',
    success: function(data) {
      addNewPlayerToNewGrid(data.player);
      
    },
    error: function(data) {
      alert("Ocorreu um erro");
    }
  });
}



function addNewPlayerToNewGrid(player) {
	   
	  var data = "<tr>" 
	  + "<td>" + player.id + "</td>"
	  + "<td>"+ player.nickName +"</td>"  
	  + "<td class ='sort'>"+ player.score+"</td>"  
	  + "<td><input type=\"button\" class=\"btn btn-danger\"  value=\"Remove\" "
	  + "onclick=\"removePlayer('" + player.nickName + "');\" /> </td>"
	  + "</tr>";
	  
	  $("#grid").append(data);
	}

function addPlayer() {
	  var data = $("#form-adiciona").serializeJSON();

	  if (data.id) {
	    updatePLayer(data);
	  } else {
	    createPlayer(data);
	  }
	}

	function createPlayer(data) {
	  data = '{\"player\":' + JSON.stringify(data) + "}";
	  $.ajax({
	    url: host + 'players',
	    type: 'POST',
	    contentType: 'application/json',
	    data: data,
	    success: function(data) {
	      alert(" Sucess!");
	      $("#form-adiciona")[0].reset();
	      listPlayers();
	    },
	    error: function(data) {
	      console.log(data);
	      alert("Ocorreu um erro: " + data.status + " " + data.statusText);
	    }
	  });
	}
	function updatePLayer(data) {
	  id = data.nickName;
	  data = "{\"player\":" + JSON.stringify(data) + "}";
	  $.ajax({
	    url: host + 'players/' + id,
	    type: 'PUT',
	    contentType: 'application/json',
	    data: data,
	    success: function(data) {
	      alert("Incluído com sucesso!");
	      $("#form-adiciona")[0].reset();
	      listPlayers();
	    },
	    error: function(data) {
	      console.log(data);
	      alert("Ocorreu um erro: " + data.status + " " + data.statusText);
	    }
	  });
	}

	function removePlayer(id) {
	  $.ajax({
	    url: host + 'players/' + id,
	    type: 'DELETE',
	    success: function(data) {
	      listPlayers();
	    },
	    error: function(data) {
	      console.log(data);
	      alert("Ocorreu um erro: " + data.status + " " + data.statusText);
	    }
	  });
	}

	function loadingPlyer(id) {
	  $.ajax({
	    url: host + 'players/' + id,
	    type: 'GET',
	    success: function(data) {
	      var frm = $("#form-edita");
	      $.each(data.player, function(key, value) {
	        $('[name=' + key + ']', frm).val(value);
	      });
	    },
	    error: function(data) {
	      console.log(data);
	      alert("Ocorreu um erro: " + data.status + " " + data.statusText);
	    }
	  });
	}


	function openModal(){
		document.getElementById("editBtn").addEventListener("click", function(){
			$("#editModal").modal();
			openModal();
		});
	}
