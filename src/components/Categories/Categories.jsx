import React from 'react';
import Title from '../Title/Title';
import ListCategories from './ListCategories';
import { pawprints } from '../../assets/img.jsx';

export default function Categories() {
	return (
		<section className="categories mt-5">
			<div className="container">
				<div className="card cstm-card border-primary">
					<div className="card-header bg-primary text-white">
						<div className="row gx-0">
							<div className="col-sm-10 col-md-10 col-lg-11">
								<Title title="Categories" size="h1" />
							</div>
							<div className="col-sm-2 col-md-2 col-lg-1">
								<img
									src={pawprints}
									alt="pawprints"
									className="cstm-img"
								/>
							</div>
						</div>
					</div>
					<div className="card-body">
						<ListCategories component="Categories" />
					</div>
				</div>
			</div>
		</section>
	);
}
