import { mainPaths, workPaths } from '../../routes/site-paths';
import Work from './window-contents/Work.svelte';
import Who from './window-contents/QAndA.svelte';
import BoomiDataVis from './window-contents/work-pages/BoomiDataVis.svelte';
import ComicSans from './window-contents/work-pages/ComicSans.svelte';
import NGSBuild from './window-contents/work-pages/NGSBuild.svelte';
import ElSayHPark from './window-contents/work-pages/ElSayHPark.svelte';
import MerchantGourmet from './window-contents/work-pages/MerchantGourmet.svelte';
import BakerHughesDataVis from './window-contents/work-pages/BakerHughesDataVis.svelte';
import type { Links } from '../../types/ContentWindow.type';

export const workLinks: Links = {
	[workPaths.boomi]: {
		title: 'Boomi',
		component: BoomiDataVis,
		initWidth: 1200,
		initHeight: 900
	},
	[workPaths.comicUltraLight]: {
		title: 'CS Ultralight',
		component: ComicSans,
		initWidth: 800,
		initHeight: 900
	},
	[workPaths.ngs]: {
		title: 'NGS',
		component: NGSBuild,
		initWidth: 800,
		initHeight: 900
	},
	[workPaths.elPark]: {
		title: 'El Say h’ Park',
		component: ElSayHPark,
		initWidth: 800,
		initHeight: 900
	},
	[workPaths.merchantGourmet]: {
		title: 'Merchant Gourmet',
		component: MerchantGourmet,
		initWidth: 800,
		initHeight: 900
	},
	[workPaths.bakerHughes]: {
		title: 'Baker Hughes',
		component: BakerHughesDataVis,
		initWidth: 800,
		initHeight: 900
	}
};

export const mainLinks: Links = {
	// [mainPaths.words]: { title: 'Words', component: Words, initWidth: 1200, initHeight: 900 },
	[mainPaths.work]: {
		title: 'Projects',
		component: Work,
		initWidth: 1200,
		initHeight: 900,
		links: workLinks
	},
	[mainPaths.qAndA]: { title: 'Q&A', component: Who, initWidth: 800, initHeight: 800 }
};

export const allLinks: Links = {
	...mainLinks,
	...workLinks
};
