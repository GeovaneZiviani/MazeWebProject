package br.org.catolicasc.geovane.maze.model;

public class PlayerExists extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PlayerExists() {
	}

	public PlayerExists(String message) {
		super(message);
	}

	public PlayerExists(Throwable cause) {
		super(cause);
	}

	public PlayerExists(String message, Throwable cause) {
		super(message, cause);
	}

	public PlayerExists(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}
