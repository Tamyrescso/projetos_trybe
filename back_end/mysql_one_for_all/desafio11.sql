SELECT
	musica AS nome_musica,
  REPLACE(
		REPLACE(
			REPLACE(
				REPLACE(
					REPLACE(musica, 'Streets', 'Code Review'),
				'Her Own', 'Trybe'),
			'Inner Fire', 'Project'),
		'Silly', 'Nice'),
	'Circus', 'Pull Request') AS novo_nome
	FROM SpotifyClone.Musicas
		WHERE musica IN(
			'Dance With Her Own',
            "Let's Be Silly",
            'Magic Circus',
            'Troubles Of My Inner Fire',
            'Without My Streets')
	ORDER BY nome_musica;