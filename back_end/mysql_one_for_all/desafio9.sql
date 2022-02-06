SELECT
	COUNT(historico.id_usuario) AS quantidade_musicas_no_historico
		FROM SpotifyClone.Historico_Reproducao AS historico
		INNER JOIN SpotifyClone.Usuarios AS usuarios
			ON usuarios.id = historico.id_usuario
			WHERE usuarios.usuario = 'Bill';