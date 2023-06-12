import Title from '../Title/Title';
import ListTags from './ListTags';
import { pawprints } from '../../assets/img.jsx';

export default function Tags() {
	const component = 'Tags';

	return (
		<section className="tags mt-5">
			<div className="container">
				<div className="cstm-card card border-primary">
					<div className="card-header bg-primary text-white">
						<div className="row">
							<div className="col-sm-10 col-md-10 col-lg-11">
								<Title title={component} size="h1" />
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
						<ListTags component={component} />
					</div>
				</div>
			</div>
		</section>
	);
}
