from sqlalchemy import create_engine
from sqlalchemy.schema import Table, MetaData, Column
from sqlalchemy.sql import select
from sqlalchemy.types import String

import json


DATABASE_URL = 'postgresql://meditreats:meditreats@df-treats-db.cs6hxh6ocizm.us-west-2.rds.amazonaws.com:5432'

if __name__ == '__main__':
	sitemap_dict = {'urlset': []}
	engine = create_engine(DATABASE_URL)

	conn = engine.connect()

	studies = Table(
	    "studies", MetaData(),
	    Column('id', String(11), primary_key=True),
	    Column('short_title', String(300)))

	study_routes = [] 
	with open("static_routes.json", "a") as f:
		for (i, row) in enumerate(conn.execute(select(studies))):
			formated_title = row[1].lower().replace(' ', '_')
			nct = row[0]

			study_routes.append({ 'id': nct, 'title': formated_title })

		json.dump({'study_routes': study_routes}, f)


