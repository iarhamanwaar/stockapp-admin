import React from 'react';
import { DocumentInfo } from '../types/approval';
import { ApprovalStatusBadge } from './ApprovalStatusBadge';

interface DocumentViewerProps {
  documents: {
    [key: string]: DocumentInfo | undefined;
  };
  title?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documents,
  title = 'Submitted Documents'
}) => {
  const formatDocumentName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📎';
    }
  };

  const isImageFile = (fileName: string): boolean => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const documentEntries = Object.entries(documents).filter(
    ([_, doc]) => doc !== undefined
  ) as [string, DocumentInfo][];

  if (documentEntries.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No documents submitted yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentEntries.map(([key, doc]) => (
          <div
            key={key}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-sm text-gray-900">
                {formatDocumentName(key)}
              </h4>
              {doc.status && (
                <ApprovalStatusBadge status={doc.status} size="sm" showIcon={false} />
              )}
            </div>

            {isImageFile(doc.fileName) ? (
              <div className="mb-3 relative aspect-video bg-gray-100 rounded overflow-hidden">
                <img
                  src={doc.url}
                  alt={formatDocumentName(key)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="%239ca3af" text-anchor="middle" dy=".3em">Preview unavailable</text></svg>';
                  }}
                />
              </div>
            ) : (
              <div className="mb-3 relative aspect-video bg-gray-50 rounded flex items-center justify-center">
                <span className="text-4xl">{getFileIcon(doc.fileName)}</span>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs text-gray-600 truncate" title={doc.fileName}>
                {doc.fileName}
              </p>
              <p className="text-xs text-gray-500">
                Uploaded: {formatDate(doc.uploadedAt)}
              </p>

              <div className="flex gap-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                >
                  <span>👁</span>
                  <span>View</span>
                </a>
                <a
                  href={doc.url}
                  download={doc.fileName}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                >
                  <span>⬇</span>
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
