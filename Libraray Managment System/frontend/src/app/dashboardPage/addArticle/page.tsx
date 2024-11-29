import dynamic from 'next/dynamic';

const AddArticleComponent = dynamic(() => import('@/components/QuillEditor'), {
    ssr: false
});

const DashboardAddArticle = () => (
    <div>
        <AddArticleComponent />
    </div>
);

export default DashboardAddArticle;
