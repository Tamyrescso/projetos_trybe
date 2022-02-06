SELECT
	ROUND(MIN(planos.preco),2) AS faturamento_minimo,
	ROUND(MAX(planos.preco),2) AS faturamento_maximo,
  ROUND(AVG(planos.preco),2) AS faturamento_medio,
  ROUND(SUM(planos.preco),2) AS faturamento_total
		FROM SpotifyClone.Planos AS planos
		INNER JOIN SpotifyClone.Usuarios AS usuarios
			ON planos.id = usuarios.id_plano;