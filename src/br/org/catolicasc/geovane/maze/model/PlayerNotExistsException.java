package br.org.catolicasc.geovane.maze.model;

public class PlayerNotExistsException extends RuntimeException {

	
	
	public PlayerNotExistsException() {

	}

	public PlayerNotExistsException(String message) {
		super(message);

	}

	public PlayerNotExistsException(Throwable cause) {
		super(cause);

	}

	public PlayerNotExistsException(String message, Throwable cause) {
		super(message, cause);

	}

	
	public PlayerNotExistsException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);

	}

}
	

