import dynamic from 'next/dynamic';

const DeleteArticleComponent = dynamic(() => import('@/components/DeleteArticle'), {
    ssr: false
});

const DashboardAddArticle = () => (
    <div>
        <DeleteArticleComponent />
    </div>
);

export default DashboardAddArticle;
