"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
function echoExecutor(options, context) {
    return __awaiter(this, void 0, void 0, function () {
        var rancherUrl, rancherToken, clusterId, projectId, namespace, deployment, tag, dockerImage, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rancherUrl = process.env['RANCHER_URL'];
                    rancherToken = process.env['RANCHER_TOKEN'];
                    clusterId = process.env['CLUSTER_ID'];
                    projectId = process.env['PROJECT_ID'];
                    namespace = options.project;
                    deployment = options.app;
                    tag = process.env['IMAGE_TAG'];
                    dockerImage = "ghcr.io/sygeman/dream/".concat(options.project, "-").concat(options.app, ":").concat(tag);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    console.log("Pull ".concat(dockerImage));
                    return [4 /*yield*/, axios_1["default"].patch("".concat(rancherUrl, "/k8s/clusters/").concat(clusterId, "/apis/apps/v1/namespaces/").concat(namespace, "/deployments/").concat(deployment), [
                            {
                                op: 'replace',
                                path: '/spec/template/spec/containers/0/image',
                                value: dockerImage
                            },
                        ], {
                            headers: {
                                'Content-Type': 'application/json-patch+json',
                                Authorization: 'Bearer ' + rancherToken
                            }
                        })];
                case 2:
                    _a.sent();
                    console.log("Redeploy ".concat(options.project, ":").concat(options.app));
                    return [4 /*yield*/, axios_1["default"].post("".concat(rancherUrl, "/v3/projects/").concat(clusterId, ":").concat(projectId, "/workloads/deployment:").concat(namespace, ":").concat(deployment, "?action=redeploy"), {}, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + rancherToken
                            }
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, { success: true }];
            }
        });
    });
}
exports["default"] = echoExecutor;
