package br.org.catolicasc.geovane.maze.services;

import java.net.URI;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.Response.Status;

import br.org.catolicasc.geovane.maze.DAO.PlayerDAO;
import br.org.catolicasc.geovane.maze.model.Player;
import br.org.catolicasc.geovane.maze.model.PlayerExists;
import br.org.catolicasc.geovane.maze.rest.Players;

@Path("/players")
@Consumes({ MediaType.TEXT_XML, MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
@Produces({ MediaType.TEXT_XML, MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })

public class PlayerScoreService {

	private PlayerDAO playerDao = new PlayerDAO();

	private static final int SIZE_PAGE = 10;

	@GET
	@Path("{nickName}")
	public Player findPlayer(@PathParam("nickName") String nickName) {
		Player player = playerDao.searchByName(nickName);
		if (player != null)
			return player;

		throw new WebApplicationException(Status.NOT_FOUND);

	}

	@GET
	public Players listAllPlayers(@QueryParam("page") int page) {
		List<Player> players = playerDao.listaPaginada(page, SIZE_PAGE);
		return new Players(players);
	}

	@POST
	public Response createPlayer(Player player) {

		try {
			playerDao.salva(player);
		} catch (PlayerExists e) {
			throw new WebApplicationException(Status.CONFLICT);
		}

		URI uri = UriBuilder.fromPath("players/{nickName}").build(player.getNickName());

		return Response.created(uri).entity(player).build();
	}

	@PUT
	@Path("{nickName}")
	public void PlayerUpdate(@PathParam("nickName") String nickName, Player player) {
		findPlayer(nickName);
		player.setNickName(nickName);
		playerDao.atualiza(player);
	}

	@DELETE
	@Path("{nickName}")
	public void removePlayer(@PathParam("nickName") String nickName) {
		playerDao.remove(nickName);
	}
}
