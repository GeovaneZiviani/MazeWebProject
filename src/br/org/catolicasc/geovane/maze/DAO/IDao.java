package br.org.catolicasc.geovane.maze.DAO;

import java.util.List;

public interface IDao<T> {

	
	public void salva(T t);

	public void remove(T t);

	public List<T> listaTodos();

	public T buscaPorld(Long id);
}
