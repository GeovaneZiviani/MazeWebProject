package br.org.catolicasc.geovane.maze.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement
@NamedQuery(name = "Player.searchByName", query = "SELECT c FROM Player c where c.nickName = :nickName ")
@Entity
@XmlAccessorType(XmlAccessType.FIELD)
public class Player implements Bean, Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;
	private String nickName;

	private String score;

	@OneToMany(mappedBy = "player", targetEntity = Score.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@XmlTransient
	private List<Score> playerScores;

	public Player(Long id, String nickName, String score, List<Score> playerScores) {
		super();
		this.id = id;
		this.nickName = nickName;
		this.score = score;
		this.playerScores = playerScores;
	}

	public Player() {
		super();

	}

	public Player(Long id) {
		this();
		this.id = id;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public List<Score> getPlayerScores() {
		return playerScores;
	}

	public void setPlayerScores(List<Score> playerScores) {
		this.playerScores = playerScores;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getNickName() {
		return nickName;
	}

	@Override
	public Long getId() {

		return id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;

	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((playerScores == null) ? 0 : playerScores.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((nickName == null) ? 0 : nickName.hashCode());
		result = prime * result + ((score == null) ? 0 : score.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Player other = (Player) obj;
		if (playerScores == null) {
			if (other.playerScores != null)
				return false;
		} else if (!playerScores.equals(other.playerScores))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (nickName == null) {
			if (other.nickName != null)
				return false;
		} else if (!nickName.equals(other.nickName))
			return false;
		if (score == null) {
			if (other.score != null)
				return false;
		} else if (!score.equals(other.score))
			return false;
		return true;
	}

	
}
