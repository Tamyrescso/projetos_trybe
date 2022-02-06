SELECT
	musicas.musica AS nome,
	COUNT(historico.id_musica) AS reproducoes
		FROM SpotifyClone.Historico_Reproducao AS historico
      INNER JOIN SpotifyClone.Usuarios AS usuarios
			  ON usuarios.id = historico.id_usuario
		  INNER JOIN SpotifyClone.Musicas AS musicas
			  ON musicas.id = historico.id_musica
          WHERE usuarios.id_plano IN(1,4)
		GROUP BY nome
    ORDER BY nome;