package br.org.catolicasc.geovane.maze.DAO;

import java.util.List;

import javax.persistence.Query;


import br.org.catolicasc.geovane.maze.model.Player;

public class PlayerDAO extends JpaDaoBase<Player> implements IDao<Player> {
	
	public Player searchByName(String nickName) {
		Query query = em.createNamedQuery("Player.searchByName").setParameter("nickName", nickName);
		List<Player> players = query.getResultList();
		if (!players.isEmpty())
			return players.get(0);
		return null;
	}
	
	public void remove(String nickName) {
		em.getTransaction().begin();
		Query query = em.createQuery("DELETE FROM Player c WHERE c.nickName = :nickName ").setParameter("nickName", nickName);
		query.executeUpdate();
		em.getTransaction().commit();
	}

}
