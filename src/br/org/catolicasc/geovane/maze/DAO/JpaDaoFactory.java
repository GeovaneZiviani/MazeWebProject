package br.org.catolicasc.geovane.maze.DAO;

public class JpaDaoFactory {

	public static JpaDaoFactory instance = new JpaDaoFactory();
	
	private PlayerDAO playerDAO;
	

	private JpaDaoFactory() {}
		
	public static JpaDaoFactory getInstance(){
		return instance;
	}
	
	
	public PlayerDAO geplayerDAO(){
		if(this.playerDAO == null)
			this.playerDAO = new PlayerDAO();
		return this.playerDAO;
	}
}
