package br.org.catolicasc.geovane.maze.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Link;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import br.org.catolicasc.geovane.maze.model.Player;

@XmlRootElement
public class Players {

	private List<Player> players = new ArrayList<>();

	public Players() {
		super();

	}

	public Players(List<Player> players) {
		this();
		this.players = players;
	}

	@XmlTransient
	public List<Player> getPlayers() {
		return players;
	}

	public void setPlayers(List<Player> players) {
		this.players = players;
	}

	@XmlElement(name = "link")
	public List<Link> getLinks() {
		List<Link> links = new ArrayList<>();
		for (Player player : getPlayers()) {

			Link link = Link.fromPath("players/{nickName}").rel("player").title(player.getNickName())
					.build(player.getNickName());

			links.add(link);
		}
		return links;
	}

	public void setLinks(List<Link> links) {

	}

}
