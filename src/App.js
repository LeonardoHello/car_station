import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home, { loader as homeLoader } from "./components/pages/Home";
import Detail, { loader as detailLoader } from "./components/pages/Detail";
import Edit, {
	loader as editLoader,
	action as editAction,
} from "./components/pages/Edit";
import Create, { action as createAction } from "./components/pages/Create";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AppLayout />}>
			<Route index element={<Home />} loader={homeLoader} />
			<Route
				path="vehicle/create"
				element={<Create />}
				action={createAction}
			/>
			<Route path="vehicle/:id" element={<Detail />} loader={detailLoader} />
			<Route
				path="vehicle/:id/edit"
				element={<Edit />}
				loader={editLoader}
				action={editAction}
			/>
		</Route>
	)
);

const App = () => <RouterProvider router={router} />;

export default App;
