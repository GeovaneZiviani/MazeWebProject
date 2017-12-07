package br.org.catolicasc.geovane.maze.DAO;

import java.util.List;

public interface IPlayer<T> {

	public List<T> listAll();

	public T currentPos(Long id, double score);

}
